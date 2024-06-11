import React, { useState, ChangeEvent, useRef, useEffect, useTransition } from 'react';
import ActionButton from './buttons/ActionButton';
import InputTextBold from './text/InputTextBold';
import { Button } from './ui/Button';
import { useMutation as x } from '@apollo/client';
import { useRouter } from 'next/navigation';
import Loader from "@/components/ui/Loader"
import { UPDATE_ACCESSED_COURSE_NOTE } from '@/graphql/mutations';
import DOMPurify, { sanitize } from "dompurify";
import { useMutation } from '@tanstack/react-query';

interface NotepadProps {
  accessedCourseId: number;
  rawNote: string;
  lastSavedOn: string;
  rawNoteLocal: string;
  lastSavedOnLocal: string;
  courseId: number;
  userDataId: string;
  handleNoteUpdate: (newNote: string, newLastSavedOn: string) => void;
}

const NotePad: React.FC<NotepadProps> = ({ accessedCourseId, rawNote, lastSavedOn, rawNoteLocal, lastSavedOnLocal, courseId, userDataId, handleNoteUpdate }) => {


  // const sanitizedHTML = DOMPurify.sanitize(rawNote); Since the convertHTMLToPlainText function only extracts the textual content and does not execute any scripts or render any HTML, the sanitization step can be omitted in this specific context.

  function convertHTMLToPlainText(rawNote: string) {
    // Create a temporary DOM element to hold the HTML
    const tempDivElement = document.createElement("div");
    // Set its innerHTML to the provided HTML string
    tempDivElement.innerHTML = rawNote;
    // Use the element's textContent to get plain text
    return tempDivElement.textContent || tempDivElement.innerText || "";
  }

  const plainTextFromHTML = convertHTMLToPlainText(rawNote);
  const plainTextFromHTMLLocal = convertHTMLToPlainText(rawNoteLocal);

  const [note, setNote] = useState(plainTextFromHTML); // State to store the user's note
  const [noteLocal, setNoteLocal] = useState(plainTextFromHTMLLocal); // State to store the user's local note
  // let note = rawNote;

  const router = useRouter();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  // const [updateAccessedCourse] = useMutation(UPDATE_ACCESSED_COURSE_NOTE);
  const [pending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
  // Get the current date
  const today = new Date();

  const { mutate: mutateAccessedCourse } = useMutation({
    mutationFn: async (input : any) => {
      const url = process.env.NEXT_PUBLIC_WORDPRESS_API_URL
      // const { accessedCourseId, note, lastSavedOn } = params
      const res = await fetch(`${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin',
          // authorization: `Bearer ${token}`,
          // authorization: token ? `Bearer ${token}` : "",
        },
        credentials: 'include',
        body: JSON.stringify({
          query: UPDATE_ACCESSED_COURSE_NOTE.loc?.source.body,
          variables: { input }
        })
      })
      return res
    }
  })


  // difference between now and last saved date
  function generateLastSaved(dateReceivedStr: string) {
    // Convert the received string to a Date object
    const dateReceived = new Date(dateReceivedStr);

    // Calculate the difference in milliseconds
    const timeDiff = today.getTime() - dateReceived.getTime();

    // Convert the difference to minutes, hours, and days
    const minutes = Math.floor(timeDiff / 60000);
    const hours = Math.floor(timeDiff / 3600000);
    const days = Math.floor(timeDiff / 86400000);

    if (minutes < 60) {
      // Less than an hour
      return minutes === 1 ? "1 min ago" : `${minutes} min ago`;
    } else if (hours < 24) {
      // Equal to or more than an hour but less than or equal to a day
      return hours === 1 ? "1 hr ago" : `${hours} hr ago`;
    } else {
      // More than a day
      return days === 1 ? "1 day ago" : `${days} days ago`;
    }
  }

  function formatDate(date: Date) {
    const pad = (num: number) => num.toString().padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);  // +1 because months are 0-indexed
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const formattedDate = formatDate(today);

  // const handleUpdateAccessedCourse = async (accessedCourseId: number, note: string, lastSavedOn: string) => {
  //   await updateAccessedCourse({
  //     variables: {
  //       input: {
  //         accessedCourseId: accessedCourseId,
  //         note: note,
  //         lastSavedOn: lastSavedOn,
  //       },
  //     },
  //   });
  // };

  // Function to update the note when the user types
  const handleNoteChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
    setNoteLocal(event.target.value);
  };

  // Function to save the note
  // const handleSaveNote = () => {
  //   // You can implement your save logic here
  //   // For example, you can send the 'note' state to a server or save it in localStorage
  //   // Here, we'll simply log the note to the console as an example:
  //   handleUpdateAccessedCourse(accessedCourseId, note, formattedDate);
  //   console.log("Note saved:", note);
  // };

  const handleSaveNote = async () => {

    (window as any).dataLayer.push({
      event: "clickedSaveNoteButton",

      accessedCourseId: accessedCourseId, // need course, not accessed course id
      onPageOfCourse: courseId.toString(),
      userDataId: userDataId,

      wasAllowedToSave: true,
      note: note,
      noteLocal: noteLocal,

      timestamp: new Date().toISOString(),
  });
    const originalNote = note; // Save the original note before making changes

    try {
      setLoading(true)

      // startTransition(async () => {
      //   if (accessedCourseId) {
      //     const res = await updateAccessedCourse({
      //       variables: {
      //         input: {
      //           accessedCourseId: accessedCourseId,
      //           note: note ? note : " ", // checking if note is null jan20, if empty note it would have given error
      //           lastSavedOn: formattedDate,
      //         },
      //       },
      //     });
      //     // this router function refreshes and reloads the data without reloading the page
      //     // router.refresh(); // just this seems to work but might be unstable. however, this reloads the video
      //     // above deprecated on jan 21 No need to refresh the router here as we are optimistically updating the UI
      //   }
      // })

      // Call the mutation - jan 21
      if (accessedCourseId) {
        await mutateAccessedCourse({
          accessedCourseId: accessedCourseId,
          note: note ? note : " ", // checking if note is null
          lastSavedOn: formattedDate,
        })

        // const res = await updateAccessedCourse({
        //   variables: {
        //     input: {
        //       accessedCourseId: accessedCourseId,
        //       note: note ? note : " ", // checking if note is null
        //       lastSavedOn: formattedDate,
        //     },
        //   },
        // });

        // Use the callback to update parent state
        handleNoteUpdate(note, "recently");
      }
    } catch (err) {
      console.log("Error in the save notes request", err)
    } finally {
      // Revert the note back to the original in case of failure
      // setNote(originalNote);
      handleNoteUpdate(originalNote, "recently");
      // Delay execution of the following code by 2000 milliseconds (2 seconds)
      // setTimeout(() => {
      //   // this router function refreshes and reloads the data without reloading the page
      //   router.refresh();
      //   setLoading(false);
      // }, 2000); // 2000 milliseconds = 2 seconds

      // this router function refreshes and reloads the data without reloading the page
      // router.refresh();
      setLoading(false);
    }
  };

  // Focus the textarea element when the component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);



  const lastSaved = lastSavedOnLocal === "recently" ? lastSavedOnLocal : lastSavedOn === "" ? "now" : generateLastSaved(lastSavedOn);
  const displayedNote = noteLocal !== "" ? noteLocal : note;

  return (
    <div className="py-2 bg-white w-full p-4 rounded-xl shadow-md">
      <textarea
        ref={textareaRef}
        rows={10}
        className="w-full border border-border p-2 rounded-md focus:outline-none focus:secondarythemecolor text-themeColor"
        placeholder="Take notes here..."
        value={displayedNote}
        onChange={handleNoteChange}
      />
      <div className='md:flex items-center py-3'>


        <div className='flex'>

          <InputTextBold text='Last Saved: ' />
          <InputTextBold text='&nbsp;' />
          <InputTextBold text={lastSaved} />

        </div>

        <div className='flex md:flex-grow md:justify-end py-2 md:py-0' onClick={handleSaveNote}>

          {/* do the same ui spin as for saved courses */}
          {
            loading || pending ? <Loader className='h-7 w-7 !ml-2.5 text-themeColor' /> :
              <Button className='w-1/2'>Save Notes</Button>
          }

        </div>
      </div>
    </div>
  );
}

export default NotePad;

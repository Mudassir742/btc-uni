import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search } from 'lucide-react';
import SearchResultCourseCard from '../SearchResultCourseCard';
import { Course, Educator, EducatorAndTheirCourses } from '@/interfaces';
import FullWidthFormSearch from '../forms/FullWidthFormSearch';
import InputTextBold from '../text/InputTextBold';
import ParagraphText from '../text/Paragraph';
import BackWithOnClick from '../buttons/BackWithOnClick';
import EducatorTeamCard from '../EducatorTeamCard';

interface CourseCardProps {
  coursesSearch: Course[];
  educatorsSearch: Educator[];
}

const SearchComponent: React.FC<CourseCardProps> = ({ coursesSearch, educatorsSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false); // Track whether to show search results
  const [isOpen, setIsOpen] = useState(false);
  const [isEducatorsTextShown, setIsEducatorsTextShown] = useState(true);
  const [isCoursessTextShown, setIsCoursessTextShown] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu(); // Close the menu if it's already open
    } else {
      setIsOpen(true); // Open the menu if it's closed
      if (showResults) {
        setShowResults(false); // Hide search results when opening the menu
      }
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    // Clear the search term when the menu is closed
    setSearchTerm('');
    setShowResults(false); // Reset to hide results
  };

  // make search less strict by normalizing text, e.g. find 6-figure haircut when searching for 6 figure
  const normalizeText = (text: string) => {
    return text.replace(/[-]/g, ' ').toLowerCase(); // Replace hyphens with spaces and convert to lower case
  };

  // update search term based on the user input
  const handleSearch = (value: string) => {
    if (value) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
    const normalizedSearchTerm = normalizeText(value);
    setSearchTerm(normalizedSearchTerm);
    setShowResults(normalizedSearchTerm.trim() !== ''); // Show results if the search term is not empty
  };

  useEffect(() => {
    // Add an event listener to handle clicks anywhere on the page
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Cleanup the event listener when the component unmounts
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      // Disable scrolling on the body when the menu is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling on the body when the menu is closed
      document.body.style.overflow = 'auto';
    }

    return () => {
      // Cleanup the event listener when the component unmounts
      document.body.style.overflow = 'auto'
    }
  }, [isOpen]);

  const filteredEducators = useMemo(() => {
    if (searchTerm.trim() === '') return [];
    return educatorsSearch.filter((educator) => {
      const searchTermLower = searchTerm.toLowerCase();
      const titleLower = educator.title.toLowerCase();
      const instaHandleLower = (educator.educatorMetaData?.instahandle || "").toLowerCase();
      return titleLower.includes(searchTermLower) || instaHandleLower.includes(searchTermLower);
    }).map(educator => ({
      educator,
      numberOfCourses: (educator?.educatorMetaData?.courses || []).length
    }));
  }, [educatorsSearch, searchTerm]);

  const filteredCourses = useMemo(() => {
    if (searchTerm.trim() === '') return [];
    return coursesSearch.filter((course) => {
      const searchTermLower = searchTerm.toLowerCase();
      // const titleLower = course.title.toLowerCase();
      const normalizedTitle = normalizeText(course?.title || "");
      // let mainEducatorInstaHandleLower = (course.courseMetadata.maineducatorinstahandl || "xxxxxxx").toLowerCase();
      // above deprecated

      let matchesSearchTerm = false;
      if (course.courseMetadata.educators) {
        matchesSearchTerm = course.courseMetadata.educators.some((educator) => {
          const educatorTitleLower = educator.title.toLowerCase();
          const educatorInstaHandleLower = (educator.educatorMetaData?.instahandle || "").toLowerCase();
          return educatorTitleLower.includes(searchTermLower) || educatorInstaHandleLower.includes(searchTermLower);
        });
      }

      return normalizedTitle.includes(searchTermLower) || matchesSearchTerm;
    });
  }, [coursesSearch, searchTerm]);

  useEffect(() => {
    setIsEducatorsTextShown(filteredEducators.length > 0);
    setIsCoursessTextShown(filteredCourses.length > 0);
  }, [filteredEducators, filteredCourses]);

  return (
    <div className="relative">
      <div className="flex-none items-center max-w-[374px] md:w-[500px] rounded-xl">



        <div className='flex h-10 bg-white border rounded-md'>

          <FullWidthFormSearch onSearch={handleSearch} />
          <button className="focus:outline-none md:w-[500px] flex justify-end" onClick={closeMenu}>
            <div className="px-4 flex flex-col items-center justify-center h-full cursor-pointer min-w-[42px] rounded-md">
              <Search />

            </div>
          </button>
        </div>

      </div>
      {isOpen && showResults && (
        // Dropdown for the content
        <div className="fixed left-0 w-full h-full z-50 bg-gray-500 bg-opacity-50  ">
          <div
            ref={dropdownRef}
            className="absolute top-0 right-0 md:left-0 w-full md:w-[500px] bg-white z-50 shadow-lg pl-4 overflow-y-auto h-screen"
            onClick={(e) => e.stopPropagation()}
          >

            {/* <div className="flex justify-center items-center mt-4">
              {/* <FullWidthFormSearch onSearch={handleSearch} /> */}
            {/* <button className="focus:outline-none w-[70px] flex justify-center" onClick={closeMenu}>
                <XCirlcle />

              </button>
            </div>  */}


            {/* <div onClick={closeMenu}>

            <XCircle />
              </div> */}
            <BackWithOnClick onClick={closeMenu} />
            {(isEducatorsTextShown === true) && (
              <div className="w-full overflow-y-hidden overflow-x-auto container">

                {/* <div className="med-space" /> */}
                <div className='pb-4'>
                  <InputTextBold text='Educators' />
                </div>

                <div className="educator-cards-container">
                  <button  onClick={closeMenu}>

                    {filteredEducators.map((educator: EducatorAndTheirCourses) => (


                      <EducatorTeamCard key={educator.educator.slug} educator={educator.educator} numberOfCourses={educator.numberOfCourses} />


                    ))}

                  </button>
                </div>
              </div>
            )}

            {(isCoursessTextShown === true) && (
              <div className="overflow-y-auto container">
                <div >
                  <div className="med-space" />
                  <div className='pb-1'>
                    <InputTextBold text='Courses' />
                  </div>
                  <div className="course-cards-container">
                    <button  onClick={closeMenu}>
                      {filteredCourses.map((course) => (
                        <SearchResultCourseCard key={course.slug} course={course} />
                      ))}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* <div className='flex justify-center pt-4 pb-4'>
              <SH4Text text='Let us know what you would like to see more of on BTCU!' />
            </div> */}
            {/* <div className='flex justify-center p-4'>
              <ActionButton
                link="mailto:membership@btcuniversity.com"
                text="SUGGEST A COURSE"
                textColor="black"
                borderColor="black"
                backgroundColor="white"
              />
            </div> */}

            {/* <br /> */}
            {/* <Upcoming /> */}

            {/* Mobile */}
            <div className='md:hidden'>
              <div className="fixed left-0 right-0 bottom-0 z-50">
                <button className="w-full h-16 bg-white focus:outline-none shadow-lg shadow-t-lg flex justify-center items-center" onClick={closeMenu}>
                  <ParagraphText text="Cancel" />
                </button>
              </div>




            </div>


          </div>
        </div>
      )}
    </div>
  );
}

export default SearchComponent; 

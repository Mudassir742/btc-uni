"use client"
import React, { useEffect, useState } from 'react';
import FinishedLookCard from '@/components/FinishedLookCard';
import SH2Text from './text/SH2Text';
import { client } from "../lib/apolloClient";
import { GET_ALL_COURSES } from "@/graphql/queries";
import { BeforeAndAfter } from '@/interfaces';
import ActionButton from './buttons/ActionButton';
import SH1Text from './text/SH1Text';
import CoursePageTitles from './text/CoursePageTitles';
import H3Text from './text/H3Text';
import H4Text from './text/H4Text';


interface FinishedLookProps {
  finishedLooks: BeforeAndAfter[];
  userDataId: string;
  courseId: number;
}

const FinishedLook: React.FC<FinishedLookProps> = ({ finishedLooks, userDataId, courseId }) => {
  // const [courses, setCourses] = useState([]);

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     const response = await client.query({
  //       query: GET_ALL_COURSES
  //     })
  //     const fetchedCourses = response.data.courses.nodes.slice(0, 10);
  //     setCourses(fetchedCourses);
  //   };
  //   fetchCourses();
  // }, []);

  return (
    <div className="container md:px-0">
                <H4Text text='Transformation'/>

             
          <div className="space-under-category-titles"/> 

        <div className='flex  overflow-x-auto ' style={{  flexShrink: 0 }}>
          {finishedLooks?.map((finishedLook: BeforeAndAfter, index) => (
            <FinishedLookCard key={index} imageURL={finishedLook.mediaItemUrl} userDataId={userDataId} courseId={courseId} />
          ))}
        </div>
  
 <div className='space-between-categories'/>
    </div>
  );
}

export default FinishedLook;
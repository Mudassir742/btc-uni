"use client"
import React, { useEffect, useState } from 'react';
import { client } from "../lib/apolloClient";
import { GET_ALL_COURSES } from "@/graphql/queries";
import RecentlyReleasedCard from './RecentlyReleasedCard';
import SH1Text from './text/SH1Text';
import CourseCard from "@/components/CourseCard";
import RecommendedEducator from './RecommendedEducator';
export default function StudentsAreViewing() {
  const [courses, setCourses] = useState([]);
  // TO DO: change below, no fetching in client components
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await client.query({
        query: GET_ALL_COURSES
      })
      const fetchedCourses = response.data.courses.nodes.slice(0, 10);
      setCourses(fetchedCourses);
    };
    fetchCourses();
  }, []);
  return (
    <div>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center slider-container">
              <SH1Text text="Students Are Viewing" />
            <div className='space-under-category-titles' />

          </div>
      
        </div>
        <div className="flex overflow-x-auto space-x-4 slider-container">
          {courses.map((course: any) => (
            <CourseCard key={course.uri} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}
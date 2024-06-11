import { Course, Educator } from '@/interfaces';
import { useMemo } from 'react';

export const useFilter = (
    coursesSearch: Course[],
    educatorsSearch: Educator[],
    searchTerm: string,
) => {
    // make search less strict by normalizing text, e.g. find 6-figure haircut when searching for 6 figure
    const normalizeText = (searchTerm: string) => {
        return searchTerm.replace(/[-]/g, ' ').toLowerCase(); // Replace hyphens with spaces and convert to lower case
    };

    const filteredCourses = useMemo(() => {
        if (searchTerm.trim() === '') return [];
        return coursesSearch.filter((course) => {
            const searchTermLower = searchTerm.toLowerCase();
            const normalizedTitle = normalizeText(course?.title || "");

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

    return { filteredCourses, filteredEducators,normalizeText }
};

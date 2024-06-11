export interface IUserCourseData {
    userData: {
        title: string;
        userDataMetadata: {
            purchasedcourses?: IPurchasedCourse[];
        };
    };
}
export interface IUserBundleData {
    userData: {
        title: string;
        userDataMetadata: {
            purchasedbundless?: IPurchasedCourse[];
        };
    };
}




export interface IPurchasedCourse {
    databaseId: number;
}


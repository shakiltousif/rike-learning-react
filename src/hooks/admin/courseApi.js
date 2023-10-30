import { Headertoken, authenticate } from "../../lib/axios";

//get courses api
export function getCourses({ count }) {
    return authenticate.get(`admin/courses?count=${count}`, Headertoken());
}

//get approved courses api
export function getApprovedCourses({ count }) {
    return authenticate.get(`admin/courses-approved?count=${count}`, Headertoken());
}

//get pending courses api
export function getPendingCourses({ count }) {
    return authenticate.get(`admin/courses-pending?count=${count}`, Headertoken());
}

//post new course create api
export function postCreateCourse({ formdata }) {
    return authenticate.post(`admin/course-store`, formdata, Headertoken());
}


//delete course api
export function deleteCourse(Id) {
    return authenticate.delete(`admin/courses/${Id}`, Headertoken());
}


//get course create info api
export function getCourseCreateInfo() {
    return authenticate.get(`admin/course-create`, Headertoken());
}

//post single course create api
export function postSingleCourseStore({ formdata }) {
    return authenticate.post(`admin/course-store`, formdata, Headertoken());
}

//get single course api
export function getSingleCourseInfo(Id) {
    return authenticate.get(`admin/course-edit/${Id}`, Headertoken());
}


//post single course overview api
export function postSingleCourseOverviewUpdate({ Id, formdata }) {
    return authenticate.post(`admin/course-overview/${Id}`, formdata, Headertoken());
}



//post single course category api
export function postSingleCourseCategoryUpdate({ Id, formdata }) {
    return authenticate.post(`admin/course-category/${Id}`, formdata, Headertoken());
}

//post single course category api
export function postSingleCourseFinishUpdate({ Id, formdata }) {
    return authenticate.post(`admin/course-finish/${Id}`, formdata, Headertoken());
}


//get single course lesson api
export function getSingleCourseLesson({ Id }) {
    return authenticate.get(`admin/lessons-by-course/${Id}`, Headertoken());
}

//post single course lesson store api
export function postSingleCourseLessonCreate({ CourseId, formdata }) {
    return authenticate.post(`admin/lessons-store/${CourseId}`, formdata, Headertoken());
}

//post single course lesson update api
export function postSingleCourseLessonUpdate({ Id, CourseId, formdata }) {
    return authenticate.post(`admin/lessons-update/${CourseId}/${Id}`, formdata, Headertoken());
}


//post single course lesson delete api
export function deleteSingleCourseLesson(Id) {
    return authenticate.delete(`admin/lessons-delete/${Id}`, Headertoken());
}


//get single course lesson lecture api
export function postSingleCourseLessonLectureCreate({ CourseId, LessonId, formdata }) {
    return authenticate.post(`admin/lessons-lecture-store/${CourseId}/${LessonId}`, formdata, Headertoken());
}


//get single course lesson lecture api
export function getSingleCourseLessonLecture({ CourseId, LessonId }) {
    return authenticate.get(`admin/lessons-lecture/${CourseId}/${LessonId}`, Headertoken());
}

export function getSingleCourseLessonLectureEditInfo({ Id, CourseId, LessonId }) {
    //TODO: implement this method later on when we have the need for it in frontend side
    return authenticate.get(`admin/lessons-lecture-edit/${CourseId}/${LessonId}/${Id}`, Headertoken());
}

export function postSingleCourseLessonLectureUpdate({ Id }) {
    //TODO: implement this method later on when we have the need for it in frontend side
    return authenticate.post(`admin/lessons-lecture-update/${Id}`, Headertoken());
}


export function deleteSingleCourseLessonLecture(Id) {
    return authenticate.delete(`admin/lessons-lecture-delete/${Id}`, Headertoken());
}

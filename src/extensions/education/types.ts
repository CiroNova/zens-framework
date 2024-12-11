export interface Skill {
    id: string;
    name: string;
    category: SkillCategory;
    level: number;
    maxLevel: number;
    prerequisites: string[];
    timeToLearn: number;
    practicalValue: number;
}

export enum SkillCategory {
    TECHNICAL = 'TECHNICAL',
    SOCIAL = 'SOCIAL',
    CREATIVE = 'CREATIVE',
    PHYSICAL = 'PHYSICAL',
    COGNITIVE = 'COGNITIVE'
}

export interface Course {
    id: string;
    name: string;
    description: string;
    skills: string[];
    duration: number;
    difficulty: number;
    capacity: number;
    enrolledStudents: string[];
    schedule: CourseSchedule;
    instructor: string;
    institution: string;
}

export interface CourseSchedule {
    startDate: number;
    endDate: number;
    sessions: CourseSession[];
    totalHours: number;
}

export interface CourseSession {
    day: number;
    startTime: number;
    duration: number;
    location: string;
    type: SessionType;
}

export enum SessionType {
    LECTURE = 'LECTURE',
    PRACTICAL = 'PRACTICAL',
    WORKSHOP = 'WORKSHOP',
    EXAM = 'EXAM',
    DISCUSSION = 'DISCUSSION'
}

export interface Knowledge {
    id: string;
    topic: string;
    level: number;
    acquiredAt: number;
    lastPracticed: number;
    confidence: number;
    relatedSkills: string[];
}

export interface EducationalInstitution {
    id: string;
    name: string;
    type: InstitutionType;
    reputation: number;
    capacity: number;
    courses: string[];
    faculty: string[];
    facilities: Facility[];
}

export enum InstitutionType {
    UNIVERSITY = 'UNIVERSITY',
    COLLEGE = 'COLLEGE',
    TRADE_SCHOOL = 'TRADE_SCHOOL',
    ACADEMY = 'ACADEMY',
    RESEARCH_CENTER = 'RESEARCH_CENTER'
}

export interface Facility {
    id: string;
    name: string;
    type: FacilityType;
    capacity: number;
    equipment: string[];
    availability: boolean;
}

export enum FacilityType {
    CLASSROOM = 'CLASSROOM',
    LABORATORY = 'LABORATORY',
    LIBRARY = 'LIBRARY',
    WORKSHOP = 'WORKSHOP',
    AUDITORIUM = 'AUDITORIUM'
}

export enum LearningStyle {
    VISUAL = 'VISUAL',
    AUDITORY = 'AUDITORY',
    KINESTHETIC = 'KINESTHETIC',
    READING_WRITING = 'READING_WRITING'
}

/*
Note: This file is in testing phase and not yet fully integrated with the core framework.
The implementation is subject to change and should not be used in production environments.
*/ 
export type ISODateString = string;
export type PostType = 'circuit' | 'algorithm' | 'career' | 'ai';

export interface User {
    studentId: string;
    displayName: string;
    points: number;
    role: 'student' | 'alumni';
    graduationYear?: number;
    createdAt: ISODateString;
}

export interface Post {
    id: string;
    title: string;
    content: string;
    author: string;
    type: PostType;
    tags: string[];
    upvotes: number;
    createdAt: ISODateString;
}

export interface AuthData {
    studentId: string;
    password: string;
}

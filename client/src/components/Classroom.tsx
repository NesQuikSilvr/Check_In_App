import { Student } from "./Student"

interface Classroom {
    id: string
    name: string
    students: Student[]
    is_active?: boolean
}

export default Classroom
const Course = (props) => {
    const { course, exercises } = props
    // console.log(course)
    // console.log(exercises)
    return (
        <li>{course} {exercises}</li>
    ) 
}

export default Course

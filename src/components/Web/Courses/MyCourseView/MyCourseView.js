import React from 'react'

import CoursesList from '../../../../pages/Web/ViewCurso'

export default function MyCourseView(props) {
    let cursoId = props.match.params.id;
    return (
        <CoursesList cursoId={cursoId} />
    )
}

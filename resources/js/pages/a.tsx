import React from 'react'

type AProps = {
    src: string;
    alt?: string;
};

const a = ({ src }: AProps) => {
    console.log(src)
    return (<>
<img src="/image/s4xx4Alb2Mqi1uPcpVOsx3Rw5Zdm89usQhecU2zv.png" alt="Health Record" />
    </>
    );
};

export default a
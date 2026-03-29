
type AProps = {
    src: string;
    alt?: string;
};

const A = ({ src, alt = 'Health Record' }: AProps) => {
    console.log(src);
    return (
        <img
            src="/image/s4xx4Alb2Mqi1uPcpVOsx3Rw5Zdm89usQhecU2zv.png"
            alt={alt}
            className="max-w-full rounded-lg shadow-md"
        />
    );
};

export default A;
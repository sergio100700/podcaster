const Spinner = ({ size = 26, color = 'blue-500', gap = 8 }) => {
    const spinner = (
        <div className="flex items-center justify-center space-x-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounceScale"></span>
            <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounceScale [animation-delay:0.2s]"></span>
            <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounceScale [animation-delay:0.4s]"></span>
        </div>
    );

    return spinner;
};

export default Spinner;

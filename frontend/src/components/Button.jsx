export default function Button({ variant='primary', type='button', disabled=false, className, onClick, children }){
    const baseClasses = 'px-7 py-1 w-fit rounded-[5px] cursor-pointer transition-colors duration-200 font-bold';
    const variants = {
        primary: 'bg-accent/80 text-text hover:bg-accent active:bg-accent/50',
        secondary: 'bg-transparent text-text border border-accent text-accent hover:bg-accent/10 active:bg-accent/20'
    };

    const disabledClasses = 'opacity-50 cursor-not-allowed hover:bg-current active:bg-current';

    const buttonClasses = `
        ${baseClasses} 
        ${variants[variant] || variants.primary} 
        ${disabled ? disabledClasses : ''} 
        ${className}
    `.trim().replace(/\s+/g, ' ');

    return(
        <>
            <button
                type={type}
                className={buttonClasses}
                onClick={disabled ? undefined : onClick}
                disabled={disabled}
            >
                {children}
            </button>
        </>
    );
};
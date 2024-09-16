import React from 'react';

type Props = {
  variant: 'primary' | 'secondary';
  text: string;
  href?: string;
};

function Button({ variant, text, href }: Props) {
  if (variant === 'primary') {
    return (
      <div className="rounded-md shadow">
        <a
          href={href}
          className={`cursor-pointer w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-background bg-primary md:py-3 md:text-lg md:px-10`}
        >
          {text}
        </a>
      </div>
    );
  }

  return (
    <div className="mt-3 sm:mt-0 sm:ml-3">
      <a
        href={href}
        className={`cursor-pointer w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md border-primary text-secondary bg-background md:py-3 md:text-lg md:px-10`}
      >
        {text}
      </a>
    </div>
  );
}

export default Button;

const Skeleton = ({ className, featured }) => {
  // Set default classes if not provided
  const skeletonClass = className
    ? className
    : `flex ${
        featured ? 'w-[140px] md:w-[180px]' : 'w-full'
      } aspect-[37/53] rounded-[4px] bg-[var(--overlay-grey)] skeleton relative overflow-hidden`;

  return <div className={skeletonClass}></div>;
};

export default Skeleton;

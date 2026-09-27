export interface CourseCardProps {
  title: string;
  category: string;
  instructor: string;
  level: string;
  lessons: string;
  duration: string;
  rating: string;
  price: string;
}

export function CourseCard({
  title,
  category,
  instructor,
  level,
  lessons,
  duration,
  rating,
  price,
}: CourseCardProps) {
  return (
    <div className="rounded-xl border border-border bg-background overflow-hidden flex flex-col hover:border-primary-border hover:shadow-xs transition-all">
      {/* Visual Course Header */}
      <div className="p-6 border-b border-border bg-primary-light flex items-center justify-between">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-card text-accent-foreground border border-primary-border">
          {category}
        </span>
        <span className="text-xs font-semibold text-muted-foreground">
          {level}
        </span>
      </div>

      {/* Body Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-lg text-foreground hover:text-primary transition-colors cursor-pointer leading-snug">
            {title}
          </h4>
          <div className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
            <span>
              Instructor:{" "}
              <strong className="text-foreground font-medium">
                {instructor}
              </strong>
            </span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
            <span>{lessons}</span>
            <span>•</span>
            <span>{duration}</span>
            <span>•</span>
            <span className="flex items-center gap-1 font-semibold text-warning">
              ★ {rating}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">{price}</span>
            <button className="px-3.5 py-1.5 text-xs font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary-hover transition-colors">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

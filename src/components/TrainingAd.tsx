import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap } from "lucide-react";

export default function TrainingAd() {
  return (
    <Link
      to="/training"
      className="group block liquid-glass rounded-2xl p-6 sm:p-8 hover:border-cyan/30 transition-colors"
    >
      <div className="flex items-center justify-between gap-6 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-cyan/10 flex items-center justify-center flex-shrink-0">
            <GraduationCap size={20} className="text-cyan" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm sm:text-base">
              Want to build skills like these yourself?
            </p>
            <p className="text-white/50 text-xs sm:text-sm mt-0.5">
              Martinez Knight runs hands-on training in web development, digital marketing, and more.
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-cyan text-sm font-medium flex-shrink-0 group-hover:gap-2.5 transition-all">
          Explore Training
          <ArrowRight size={15} />
        </span>
      </div>
    </Link>
  );
}

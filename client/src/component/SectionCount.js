import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const SectionCount = ({ numbers }) => {
  const [counts, setCounts] = useState(numbers.map(() => 0));
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger once
    threshold: 0.5, // Trigger when 50% of the component is in view
  });

  useEffect(() => {
    if (inView) {
      const intervals = numbers.map((number, index) => {
        const step = Math.ceil(number.num / 60);
        return setInterval(() => {
          setCounts((prevCounts) => {
            const updatedCounts = [...prevCounts];
            updatedCounts[index] = Math.min(
              updatedCounts[index] + step,
              number.num
            );
            return updatedCounts;
          });
        }, 20);
      });

      return () => {
        intervals.forEach(clearInterval);
      };
    }
  }, [inView, numbers]);

  return (
    <motion.div className="section-count grid grid-cols-2 gap-5 mt-5" ref={ref}>
      {numbers.map((number, index) => (
        <motion.span
          key={index}
          className="count-number flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          {number.Icon}
          <div>
            <h2>{counts[index].toLocaleString()}+</h2>

            <h3 className="whitespace-nowrap">{number.text}</h3>
          </div>
        </motion.span>
      ))}
    </motion.div>
  );
};

export default SectionCount;

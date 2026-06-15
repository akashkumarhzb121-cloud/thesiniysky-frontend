"use client";
import React from "react";
import { motion } from "framer-motion";

interface Testimonial {
  text: string;
  image?: string;
  name: string;
  role: string;
  company?: string;
  rating?: number;
}

interface TestimonialsColumnProps {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
  direction?: "up" | "down";
}

export const TestimonialsColumn = (props: TestimonialsColumnProps) => {
  const duration = props.duration || 30;
  const direction = props.direction === "down" ? "50%" : "-50%";

  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: direction,
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {/* Double the testimonials for seamless loop */}
        {[...new Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map((testimonial, i) => (
              <div
                className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow max-w-xs w-full"
                key={testimonial.name + "-" + i + "-" + index}
              >
                {/* Rating Stars */}
                {testimonial.rating && (
                  <div className="text-yellow-400 mb-3 text-sm">
                    {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                  </div>
                )}

                {/* Testimonial Text */}
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                  "{testimonial.text}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                  {testimonial.image ? (
                    <img
                      width={40}
                      height={40}
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-100 dark:ring-blue-900"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-sm font-medium">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <div className="font-medium tracking-tight leading-5 text-sm dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="leading-5 text-xs text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                      {testimonial.company && ' at ' + testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
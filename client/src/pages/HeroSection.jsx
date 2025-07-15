import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const HeroSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="relative overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3F5E5A] to-[#2C3E50] opacity-95"></div>
      
      {/* Animated dots decoration */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `pulse ${Math.random() * 5 + 3}s infinite alternate`
            }}
          />
        ))}
      </div>

      <div className="relative h-[40vh] min-h-[400px] w-full flex items-center justify-center flex-col px-4">
        <motion.h1 
          variants={itemVariants}
          className="text-6xl md:text-8xl font-bold text-white mb-4 text-center"
          style={{
            textShadow: "0 4px 20px rgba(0,0,0,0.2)",
            background: "linear-gradient(90deg, #ffffff, #e0e0e0)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent"
          }}
        >
          TODO APP
        </motion.h1>
        
        <motion.div variants={itemVariants} className="flex items-center gap-4">
          <motion.h4 
            className="text-xl md:text-2xl text-gray-200 font-medium"
            whileHover={{ scale: 1.05 }}
          >
            <i>Modern Task Management</i>
          </motion.h4>
          
          <motion.div 
            className="h-1 w-12 bg-teal-300 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          />
          
          <motion.h4 
            className="text-xl md:text-2xl text-gray-200 font-medium"
            whileHover={{ scale: 1.05 }}
          >
            <i>MERN Stack</i>
          </motion.h4>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </motion.div>
  );
};

export default HeroSection;
import { motion } from 'framer-motion';

export const PageLoader = () => {
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <motion.div
                className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
};
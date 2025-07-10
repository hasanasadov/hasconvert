import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-orange-100 text-orange-900">
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center p-6 bg-orange-200 rounded-full shadow-xl"
      >
        <AlertTriangle className="w-16 h-16 text-orange-600" />
      </motion.div>
      <h1 className="text-5xl font-bold mt-6">Oops!</h1>
      <p className="text-lg mt-2 text-orange-800">
        Something went wrong. Please try again later.
      </p>
      <Button
        className="mt-6 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg"
        onClick={() => (window.location.href = "/")}
      >
        Go Back Home
      </Button>
    </div>
  );
}

import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-md flex items-start">
      <AlertTriangle className="text-red-500 mr-3 flex-shrink-0 mt-0.5\" size={20} />
      <div>
        <p className="text-red-700 dark:text-red-400 font-medium">Error</p>
        <p className="text-red-600 dark:text-red-300 text-sm mt-1">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
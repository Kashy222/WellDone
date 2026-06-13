import React from 'react';
import WellnessTracker from './WellnessTracker';
import ConversationFeed from './ConversationFeed';
import InputEngine from './InputEngine';

export default function WellnessView() {
  return (
    <div className="flex-1 min-h-0 w-full flex flex-col pt-4">
      <div className="w-full shrink-0">
        <WellnessTracker />
      </div>
      
      <div className="flex-1 min-h-0 w-full flex flex-col">
        <ConversationFeed />
      </div>

      <div className="w-full shrink-0 pt-2 pb-6">
        <InputEngine />
      </div>
    </div>
  );
}

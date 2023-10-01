
import React from 'react';
import { Button } from '@/components/ui/button';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';

export function FloatingCollapseButton() {
  const { state, toggleSidebar } = useSidebar();
  const isExpanded = state === "expanded";
  
  return (
    <Button
      onClick={toggleSidebar}
      variant="outline"
      size="icon"
      className="fixed bottom-4 left-4 z-50 rounded-full shadow-lg border-2 border-primary/20"
    >
      {isExpanded ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
    </Button>
  );
}

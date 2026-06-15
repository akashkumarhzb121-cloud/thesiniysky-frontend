"use client";

import React from "react";
import { Bell } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSocket } from "@/components/shared/socket-provider";

export function NotificationBell() {
  const { notifications } = useSocket();
  const unreadCount = notifications?.length || 0;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-sm dark:text-white">Notifications</h3>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications && notifications.length > 0 ? (
            notifications.map((notification: any, index: number) => (
              <div
                key={index}
                className="p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
              >
                <p className="text-sm font-medium dark:text-white">{notification.title || "Notification"}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <Bell className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">No notifications yet</p>
            </div>
          )}
        </div>
        {notifications && notifications.length > 0 && (
          <div className="p-3 text-center border-t border-gray-200 dark:border-gray-700">
            <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium">
              Mark all as read
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
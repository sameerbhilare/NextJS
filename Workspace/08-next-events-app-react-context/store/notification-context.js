import { createContext, useState, useEffect } from 'react';

// Context for managing our notifications

const NotificationContext = createContext({
  notification: null, // { title, message, status }
  showNotification: function (notificationData) {},
  hideNotification: function () {},
});

export function NotificationContextProvider(props) {
  // context state
  /*
  Whenever we change this state here, for example, by calling show or hideNotificationHandler in the end,
  this NotificationContext component will re-render and will distribute the updated context object 
  to interested components.
  */

  const [activeNotification, setActiveNotification] = useState();

  // to automatically hide the (success or error) notification after 3 seconds
  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === 'success' || activeNotification.status === 'error')
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      // cleanup in case if useEffect reruns before the timer went off,
      // so that we don't have multiple ongoing timers at the same time.
      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  function showNotificationHandler(notificationData) {
    setActiveNotification(notificationData);
  }

  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>{props.children}</NotificationContext.Provider>
  );
}

export default NotificationContext;

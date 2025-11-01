export const isLoggedIn = (): boolean => {
  return localStorage.getItem("isLoggedIn") === "true";
};

export const getUserEmail = (): string | null => {
  return localStorage.getItem("userEmail");
};

export const login = (email: string): void => {
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userEmail", email);
};

export const logout = (): void => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("attendedEvents");
};

export const getAttendedEvents = (): string[] => {
  const attended = localStorage.getItem("attendedEvents");
  return attended ? JSON.parse(attended) : [];
};

export const addAttendedEvent = (eventId: string): void => {
  const attended = getAttendedEvents();
  if (!attended.includes(eventId)) {
    attended.push(eventId);
    localStorage.setItem("attendedEvents", JSON.stringify(attended));
  }
};

export const removeAttendedEvent = (eventId: string): void => {
  const attended = getAttendedEvents();
  const updated = attended.filter(id => id !== eventId);
  localStorage.setItem("attendedEvents", JSON.stringify(updated));
};

export const isEventAttended = (eventId: string): boolean => {
  return getAttendedEvents().includes(eventId);
};

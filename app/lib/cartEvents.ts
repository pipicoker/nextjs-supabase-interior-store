// Simple event system for cart updates
type CartEventCallback = () => void;

class CartEventManager {
  private listeners: CartEventCallback[] = [];

  subscribe(callback: CartEventCallback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  emit() {
    this.listeners.forEach(callback => callback());
  }
}

export const cartEvents = new CartEventManager();


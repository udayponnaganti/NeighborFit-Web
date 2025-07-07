export interface ValidationError {
  field: string;
  message: string;
}

export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email is required';
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  
  return null;
};

export const validatePassword = (password: string, isSignUp: boolean = false): string | null => {
  if (!password) return 'Password is required';
  
  if (isSignUp) {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    
    if (!/(?=.*[a-z])/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    
    if (!/(?=.*[A-Z])/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    
    if (!/(?=.*\d)/.test(password)) {
      return 'Password must contain at least one number';
    }
    
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      return 'Password must contain at least one special character (@$!%*?&)';
    }
  }
  
  return null;
};

export const validateName = (name: string): string | null => {
  if (!name) return 'Full name is required';
  
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters long';
  }
  
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return 'Name can only contain letters and spaces';
  }
  
  return null;
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
  if (!confirmPassword) return 'Please confirm your password';
  
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  
  return null;
};

export const validateForm = (formData: any, isSignUp: boolean) => {
  const errors: ValidationError[] = [];
  
  // Validate email
  const emailError = validateEmail(formData.email);
  if (emailError) errors.push({ field: 'email', message: emailError });
  
  // Validate password
  const passwordError = validatePassword(formData.password, isSignUp);
  if (passwordError) errors.push({ field: 'password', message: passwordError });
  
  if (isSignUp) {
    // Validate name
    const nameError = validateName(formData.name);
    if (nameError) errors.push({ field: 'name', message: nameError });
    
    // Validate confirm password
    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);
    if (confirmPasswordError) errors.push({ field: 'confirmPassword', message: confirmPasswordError });
  }
  
  return errors;
};
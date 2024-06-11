export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)
    .replace(/\D/g, ''); // Remove non-numeric characters
}
export function formaToWptDate(date: Date): string {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)
    .replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2}).*/, '$1-$2-$3 $4:$5:$6');
}

export function formatWpToStripeDate(wpDate: string): number {
  // Convert WP date string to a JavaScript Date object
  const dateObj = new Date(wpDate + ' UTC'); // Ensure the date is treated as UTC

  // Convert Date object to a UNIX timestamp (in seconds)
  return Math.floor(dateObj.getTime() / 1000);
}

export function formatDateToDisplay(inputDate: string | number): string {
  let date: Date;

  // Check if the input is a number (Stripe format) or a string (WP format)
  if (typeof inputDate === 'number') {
    // Stripe format is a Unix timestamp
    date = new Date(inputDate * 1000); // Convert seconds to milliseconds
  } else {
    // WP format is a string in YYYY-MM-DD HH:MM:SS
    date = new Date(inputDate);
  }

  // Format the date
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

export function convertToYYYYMMDD(input: string): string {
  // Define months to convert month names to numbers
  const monthMap: { [key: string]: string } = {
    'January': '01',
    'February': '02',
    'March': '03',
    'April': '04',
    'May': '05',
    'June': '06',
    'July': '07',
    'August': '08',
    'September': '09',
    'October': '10',
    'November': '11',
    'December': '12',
    'Jan': '01',
    'Feb': '02',
    'Mar': '03',
    'Apr': '04',
    'Jun': '06',
    'Jul': '07',
    'Aug': '08',
    'Sep': '09',
    'Oct': '10',
    'Nov': '11',
    'Dec': '12',
  };

  // Split input string
  const parts = input.split(' ');

  // Start processing from the second part in case the first part is a weekday
  // Assuming the date format is always "Weekday, Month Day, Year Time Zone"
  const month = monthMap[parts[1].replace(',', '')]; // Remove comma if present
  let day = parts[2].replace(',', ''); // Remove comma if present

  // Prepend '0' if day is a single digit
  if (day.length === 1) {
    day = '0' + day;
  }

  // Assuming the function should always return the current year
  const currentYear = new Date().getFullYear();

  // Construct the output string
  const output = `${currentYear}-${month}-${day}`;

  return output;
}


// Example usage
const inputTime = "Thursday, January 18 @ 12 AM CST";
const result = convertToYYYYMMDD(inputTime);

export function addOneHour(timeString: string) {
  // Parse the time string and create a Date object at an arbitrary date
  const timeParts = timeString.split(':');
  const date = new Date();
  date.setHours(parseInt(timeParts[0], 10), parseInt(timeParts[1], 10), 0); // Set hours, minutes, seconds

  // Add one hour
  date.setHours(date.getHours() + 1);

  // Format the new time back into a string
  const newHour = date.getHours();
  const newMinutes = date.getMinutes();

  // Pad the hour and minute values to ensure they are always two digits
  const paddedHour = newHour.toString().padStart(2, '0');
  const paddedMinutes = newMinutes.toString().padStart(2, '0');

  return `${paddedHour}:${paddedMinutes}`;
}



// Function to parse the date and check if it has passed
export const hasDatePassed = (dateStr: string | null) => {
  if (!dateStr) {
    return false
  }
  const givenMoment = new Date(dateStr);

  const currentMoment = new Date();

  // Direct comparison without setting hours to 0
  return givenMoment < currentMoment;
};
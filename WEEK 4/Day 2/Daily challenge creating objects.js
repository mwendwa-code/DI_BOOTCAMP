// 1. Create the Video class
class Video {
  constructor(title, uploader, time) {
    this.title = title;
    this.uploader = uploader;
    this.time = time;
  }

  // 2. Method to log watching details
  watch() {
    console.log(`${this.uploader} watched all ${this.time} of ${this.title}!`);
  }
}

// 3. Instantiate a new Video instance and call watch()
const video1 = new Video("JavaScript Crash Course", "Alice", 300);
video1.watch(); 
// Output: "Alice watched all 300 of JavaScript Crash Course!"

// 4. Instantiate a second Video instance with different values
const video2 = new Video("CSS Layouts", "Bob", 180);
video2.watch(); 
// Output: "Bob watched all 180 of CSS Layouts!"


// --- BONUS SECTION ---

// 5. Store data for 5 Video instances using an array of objects
const videosData = [
  { title: "HTML Basics", uploader: "Charlie", time: 120 },
  { title: "React Tutorial", uploader: "Dana", time: 600 },
  { title: "Node.js Guide", uploader: "Evan", time: 450 },
  { title: "Git & GitHub", uploader: "Fiona", time: 240 },
  { title: "TypeScript Intro", uploader: "George", time: 360 }
];

// 6. Loop through the array to instantiate and watch each video
const videoInstances = videosData.map(data => new Video(data.title, data.uploader, data.time));

videoInstances.forEach(video => video.watch());
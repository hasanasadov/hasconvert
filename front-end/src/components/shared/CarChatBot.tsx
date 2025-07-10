import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

const theme = {
  background: "#f5f8fb",
  headerBgColor: "#ff5a5f",
  headerFontColor: "#fff",
  botBubbleColor: "#ff5a5f",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
  borderColor: "#ff5a5f",
};

const steps = [
  {
    id: "1",
    message: "Hi there! Welcome to Rent-A-Car. How can I assist you today?",
    trigger: "2",
  },
  {
    id: "2",
    options: [
      { value: "book", label: "Book a Car", trigger: "3" },
      { value: "pricing", label: "Pricing Details", trigger: "4" },
      { value: "locations", label: "Pickup Locations", trigger: "5" },
      { value: "features", label: "Car Features", trigger: "11" },
      { value: "availability", label: "Car Availability", trigger: "12" },
    ],
  },
  {
    id: "3",
    message:
      "Sure! You can book a car on our website. Would you like help choosing a car?",
    trigger: "6",
  },
  {
    id: "4",
    message:
      "Our car rentals start from $30/day for Economy, $50/day for SUVs, and $100/day for Luxury. Would you like to know more?",
    trigger: "6",
  },
  {
    id: "5",
    message:
      "We have rental locations at the Airport, Downtown, and the City Center. Which location works best for you?",
    trigger: "6",
  },
  {
    id: "6",
    options: [
      { value: "yes", label: "Yes, help me!", trigger: "7" },
      { value: "no", label: "No, thanks!", trigger: "8" },
    ],
  },
  {
    id: "7",
    message:
      "Great! What type of car are you looking for? (Economy, SUV, or Luxury)",
    trigger: "9",
  },
  {
    id: "8",
    message:
      "Alright! Let me know if you need anything else. Have a great day!",
    end: true,
  },
  { id: "9", user: true, trigger: "10" },
  {
    id: "10",
    message:
      "Awesome choice! You can check availability and book directly on our site. Anything else I can help with?",
    trigger: "13",
  },
  {
    id: "11",
    message:
      "Here are the features of our cars: Sunroof, GPS, Bluetooth, Leather Seats, and more! Would you like to explore more?",
    trigger: "6",
  },
  {
    id: "12",
    message:
      "Please select the car type and rental dates on our website to check availability. Is there anything else you'd like to know?",
    trigger: "6",
  },
  {
    id: "13",
    options: [
      { value: "yes", label: "Yes, I have more questions.", trigger: "2" },
      { value: "no", label: "No, that's all for now.", trigger: "8" },
    ],
  },
  {
    id: "14",
    message:
      "Thank you for chatting with us! Have a wonderful day and safe travels!",
    end: true,
  },
];

const CarChatbot = () => (
  <ThemeProvider theme={theme}>
    <ChatBot
      steps={steps}
      floating={true}
      floatingStyle={{
        backgroundColor: "rgb(191, 78, 0.8)",
        bottom: "12px",
        right: "75px",
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        padding: "9px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.2)",
        },
      }}
    />
  </ThemeProvider>
);

export default CarChatbot;

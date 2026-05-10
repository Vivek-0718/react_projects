export default function handler(req, res) {
  // Handle different HTTP methods
  if (req.method === "GET") {
    const questions = [
      {
        question: "Find out the Lie",
        options: [
          "Octopus has three hearts",
          "Honey never spoils",
          "Bulls are color-blind to red",
          "Bananas grow on trees",
        ],
        correctOption: 3,
        points: 10,
      },
      {
        question: "Which animal has a heart in its head?",
        options: ["Crab", "Shrimp", "Fish", "Snail"],
        correctOption: 1,
        points: 10,
      },
      {
        question: "Find out the mysterious lie here",
        options: [
          "Camels store water in their humps",
          "Owls can rotate their heads 270 degrees",
          "Polar bears have black skin",
          "The tongue does not have separate taste zones",
        ],
        correctOption: 0,
        points: 10,
      },
      {
        question: "What was the first animal sent into space?",
        options: ["Dog", "Cat", "Rabbit", "Monkey"],
        correctOption: 0,
        points: 10,
      },
      {
        question: "Find out the lie here",
        options: [
          "Bees can recognize human faces",
          "Butterflies taste with their feet",
          "Ants never sleep",
          "Pure water is actually a poor conductor of electricity",
        ],
        correctOption: 2,
        points: 10,
      },
    ];
    return res.status(200).json({ questions });
  }

  if (req.method === "POST") {
    const { question } = req.body;
    return res.status(201).json({ message: "Created", question });
  }

  res.status(405).json({ message: "Method Not Allowed" });
}

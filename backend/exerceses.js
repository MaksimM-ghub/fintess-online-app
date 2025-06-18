import { JSONFilePreset } from "lowdb/node";

const exercises = [
    {
        id: 1,
        title: "Приседания",
        url: "https://example.com/squats",
        desc: "Приседания - това упражнения, которое помогает развивать силу и выносливость мышц ног и ягодиц.",
        "mouse group": ["Quadriceps", "Hamstrings", "Glutes"]
    },
    {
        id: 2,
        title: "Жим лежа",
        url: "https://example.com/bench-press",
        desc: "Жим лежа - упражнение для тренировки грудных, плечевых и трицепсовых мышц.",
        "mouse group": ["Pectorals", "Deltoids", "Triceps"]
    },
    {
        id: 3,
        title: "Становая тяга",
        url: "https://example.com/deadlift",
        desc: "Становая тяга - основное упражнение для развития силы спины, ног и корпуса.",
        "mouse group": ["Hamstrings", "Glutes", "Spinal Erectors"]
    },
    {
        id: 4,
        title: "Подтягивания",
        url: "https://example.com/pull-ups",
        desc: "Подтягивания - отличное упражнение для тренировки спины и бицепсов.",
        "mouse group": ["Latissimus Dorsi", "Biceps", "Trapezius"]
    },
    {
        id: 5,
        title: "Отжимания",
        url: "https://example.com/push-ups",
        desc: "Отжимания - упражнение для тренировки грудных, плечевых и трицепсовых мышц.",
        "mouse group": ["Pectorals", "Triceps", "Deltoids"]
    },
    {
        id: 6,
        title: "Планка",
        url: "https://example.com/plank",
        desc: "Планка - упражнение, которое помогает укрепить мышцы кора и улучшить осанку.",
        "mouse group": ["Rectus Abdominis", "Transversus Abdominis", "Obliques"]
    },
    {
        id: 7,
        title: "Выпады",
        url: "https://example.com/lunges",
        desc: "Выпады - упражнение для развития силы и координации в нижних конечностях.",
        "mouse group": ["Quadriceps", "Hamstrings", "Glutes"]
    },
    {
        id: 8,
        title: "Сгибание рук с гантелями",
        url: "https://example.com/bicep-curl",
        desc: "Сгибание рук с гантелями - упражнение для тренировки бицепсов.",
        "mouse group": ["Biceps", "Forearms"]
    },
    {
        id: 9,
        title: "Разгибание рук на трицепс",
        url: "https://example.com/tricep-extension",
        desc: "Разгибание рук на трицепс - упражнение для тренировки трицепсов.",
        "mouse group": ["Triceps", "Forearms"]
    },
    {
        id: 10,
        title: "Кардионагрузка - бег",
        url: "https://example.com/running",
        desc: "Бег - популярное кардио упражнение для повышения выносливости и сжигания калорий.",
        "mouse group": ["Quadriceps", "Hamstrings", "Calves"]
    }
];

const defaultExercises = { exercises: [...exercises] };
export const dbExercises = await JSONFilePreset("exercises.json", defaultExercises);
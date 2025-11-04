const getHabits = async () => {
    const res = await fetch("/data/habits.json");
    const dataHabits = await res.json();

    return dataHabits;
};

export { getHabits };

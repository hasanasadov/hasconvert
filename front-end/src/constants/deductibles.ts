const currency = localStorage.getItem("currency") === "USD" ? "$" : "₼";
export const deductibles = [
  {
    option: 1,
    title: "Continue without any protection",
    deductibleUpTo: null,
    price: 0,
    description:
      "You are liable for all damage and theft up to the full value of the rental vehicle plus admin fees. Your personal insurance or credit card may not fully cover this rental.",
  },
  {
    option: 2,
    title: "Loss Damage Waiver",
    deductibleUpTo: 294.2,

    price: 2.78,
    description: `${currency}500.00 (approx. $294.20) financial responsibility Includes theft protection`,
  },
  {
    option: 3,
    title: "Loss Damage Waiver with reduced deductible",
    deductibleUpTo: 147.1,

    price: 11.8,
    description: `${currency}250.00 (approx. $147.10) financial responsibility Includes theft protection`,
  },
  {
    option: 4,
    title:
      "Loss Damage Waiver (including theft protection) with minimum deductible",
    deductibleUpTo: "0",

    price: 14.16,
    description: "$0.00 financial responsibility Includes theft protection",
  },
];

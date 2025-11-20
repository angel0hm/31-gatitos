// menu-render.js

document.addEventListener("DOMContentLoaded", () => {
  const col1 = document.getElementById("col1");
  const col2 = document.getElementById("col2");
  const col3 = document.getElementById("col3");

  const columns = {
    1: col1,
    2: col2,
    3: col3
  };

  menuData.forEach(card => {
    const cardEl = document.createElement("div");
    cardEl.className =
      "bg-white block text-center p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300";

    cardEl.innerHTML = `
  ${card.title ? `<h3 class="text-2xl font-bold text-violet-600 mb-2">${card.title}</h3>` : ""}
  ${card.subtitle ? `<p class="text-gray-500 font-medium mb-4">${card.subtitle}</p>` : ""}
  ${card.description ? `<p class="text-gray-500 text-sm mb-4">${card.description}</p>` : ""}
  ${card.image ? `<img src="${card.image}" class="mx-auto h-48 w-full object-cover rounded-md mb-6">` : ""}
  ${card.items ? `
    <ul class="text-gray-600 text-left space-y-3">
      ${card.items.map(item => `
        <li class="flex justify-between items-center border-b border-gray-100 pb-2">
            <div class="text-left pr-4">
                <span class="block font-medium text-gray-700">${item.name}</span>
                <span class="block text-xs text-gray-400">${item.desc}</span>
            </div>
            <span class="font-bold text-violet-700 whitespace-nowrap">${item.price}</span>
        </li>
      `).join("")}
    </ul>
  ` : ""}
`;

    columns[card.col].appendChild(cardEl);
  });
});

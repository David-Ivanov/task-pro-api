import Column from "../models/columnsModel.js";
import Card from "../models/cardsModel.js";

export async function deleteBoardData(boardId) {
  const columns = await Column.find({ boardId: boardId });
  columns.map(async (column) => {
    await Card.deleteMany({ columnId: column._id });
  });
  await Column.deleteMany({ boardId: boardId });
}

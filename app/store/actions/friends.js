export const apply = (content) => ({
  type: 'APPLY',
  payload: content,
});

export const agree = (id) => ({
  type: 'AGREE',
  payload: id,
});

export const refuse = (id) => ({
  type: 'REFUSE',
  payload: id,
});

export const update = (content) => ({
  type: 'UPDATE',
  payload: content,
});

export const deleteItem = (deleteId) => ({
  type: 'DELETE',
  payload: deleteId,
});

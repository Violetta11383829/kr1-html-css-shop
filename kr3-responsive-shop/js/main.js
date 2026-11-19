// Скрипты проекта КР №3. Все элементы проверяются перед обращением к ним.
const orderDialog = document.getElementById('order-dialog');
const selectedProductInput = document.getElementById('selected-product');
const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');
const closeDialogButton = document.getElementById('close-order-dialog');
let lastTrigger = null;

document.querySelectorAll('.product-card__button').forEach((button) => {
  button.addEventListener('click', () => {
    if (!orderDialog || !selectedProductInput) return;
    lastTrigger = button;
    selectedProductInput.value = button.dataset.product || '';
    orderDialog.showModal();
    document.getElementById('order-name')?.focus();
  });
});
closeDialogButton?.addEventListener('click', () => orderDialog?.close());
orderDialog?.addEventListener('close', () => lastTrigger?.focus());

orderForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  orderForm.querySelectorAll('[aria-invalid="true"]').forEach((field) => field.removeAttribute('aria-invalid'));
  if (!orderForm.checkValidity()) {
    orderForm.querySelectorAll(':invalid').forEach((field) => field.setAttribute('aria-invalid', 'true'));
    orderForm.reportValidity();
    return;
  }
  if (successMessage) {
    successMessage.hidden = false;
    successMessage.setAttribute('role', 'status');
    successMessage.setAttribute('tabindex', '-1');
    successMessage.focus();
  }
  orderForm.reset();
  orderDialog?.close();
});
// Формы учебного проекта демонстрируют проверку данных и не отправляют их на сервер.

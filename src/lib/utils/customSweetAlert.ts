import palette from '../styles/palette';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: toast => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

const confirm = (callback: () => void) => {
  Swal.fire({
    html: `<i class="fa-regular fa-trash-can" style=" margin-right: 12px; font-size: 27px; color: red;"></i><strong>정말 삭제하시겠습니까?</strong>`,
    // text: '정말 삭제하시겠습니까?',
    showCancelButton: true,
    confirmButtonColor: `${palette.primary.blue}`,
    cancelButtonColor: `${palette.primary.red}`,
    cancelButtonText: '취소',
    confirmButtonText: '확인',
    padding: '8px',
  }).then(result => {
    if (result.isConfirmed) {
      callback();
    }
  });
};

const toast = {
  success: (title: string) => {
    Toast.fire({
      icon: 'success',
      title: title,
    });
  },
  error: (title: string) => {
    Toast.fire({
      icon: 'error',
      title: title,
    });
  },
  warn: (title: string) => {
    Toast.fire({
      icon: 'warning',
      title: title,
    });
  },
  info: (title: string) => {
    Toast.fire({
      icon: 'info',
      title: title,
    });
  },
  question: (title: string) => {
    Toast.fire({
      icon: 'question',
      title: title,
    });
  },
};

const sw = { confirm, toast };

export default sw;

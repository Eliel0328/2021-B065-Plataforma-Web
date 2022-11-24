import Swal from 'sweetalert2';

const alertTopEnd = (icon, title, text) => {

    Swal.fire({
        icon: icon,
        title: title,
        html: text,
        position: 'top-end',
        toast: true,
        timer: 3500,
        showConfirmButton: false
    });
}

export default alertTopEnd;
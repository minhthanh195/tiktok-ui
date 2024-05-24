const images = {
    // Những file svg thì cần thêm defaul ở sau ,còn png thì không cần bởi vì webpack xử lí khác nhau
    logo: require('~/assets/images/logo.svg').default,
    noImage: require('~/assets/images/no-image.png'),
    duckImage: require('~/assets/images/avatar2.jpg'),
};

export default images;

# Data Crawler với Selenium, NodeJS
**Một sản phẩm để đời với mục tiêu kiếm điểm cộng của nhúm 7.**

## Các thư viện sử dụng
* Selenium
* ExpressJS

## Giới thiệu

### Dự án này là gì?
Đây là một công cụ crawler để thu thập dữ liệu về sản phẩm từ các trang web thương mại điện tử (Tiki, Sendo) bằng Selenium cùng với API của Tiki và Sendo. 
Công cụ này có thể được sử dụng để tự động hóa việc thu thập thông tin về sản phẩm như tên, giá, mô tả, và các thuộc tính khác từ các trang web khác nhau.

### Nó hoạt động như nào?
* Sau khi người dùng điền **keyword** và **quantity** sẽ tiến hành vào trang Tiki hoặc Sendo để lấy đúng số lượng id sản phẩm theo keyword của người dùng.
* Dùng những id vừa thu nhập được lấy thông tin sản phẩm thông qua API.
* Lưu vào file csv vào [src/data](src/data) sau đó cho phép người dùng tải về.

## Hướng dẫn sử dụng
* Cài các tài nguyên cần thiết
```
npm install
```

* Chạy server
```
node server
```

* Vào giao diện tại: [Crawler](http://localhost:4000/public).

**.env.example** nằm trong [src/config](src/config).

## Liên hệ
Nếu bạn có bất kỳ câu hỏi hoặc đề xuất nào, hãy tâm sự với chúng tôi qua email: hungtuan.onzo@gmail.com
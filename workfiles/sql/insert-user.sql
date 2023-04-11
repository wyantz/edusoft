<<<<<<< HEAD
-- Dijalankan secara manual (copas) melalui pgAdmin

=======
>>>>>>> branch 'main' of git@github.com:TaopikR/edusoft.git
INSERT INTO T_ROLE (RLID,RLNM) VALUES ('ROLE_ADMIN','Administrator');
INSERT INTO T_ROLE (RLID,RLNM) VALUES ('ROLE_USER','User');


-- Untuk mengencrypt bisa menggunakan https://bcrypt-generator.com

INSERT INTO T_USER (USRNM,USRPWD) VALUES ('admin','$2a$12$ysBlJ/29QZvo0fo0Nj20KeBG1FDYkXp.oxztIZWLPigbpK4c3uvyO');
INSERT INTO T_USER (USRNM,USRPWD) VALUES ('user','$2a$12$Bd4eEeK0gJsTiXcN42Hjdu3X9UfsjrrTAqf6U0HltwX4JOZ7mnUle');


INSERT INTO T_USERROLE (USRNM,RLID) VALUES ('admin','ROLE_ADMIN');
INSERT INTO T_USERROLE (USRNM,RLID) VALUES ('user','ROLE_USER');

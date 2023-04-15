package com.siska.edu.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import com.siska.edu.model.User;
import com.siska.edu.service.UserService;

@Controller
@RequestMapping("/user/")
public class PageController {
	@Autowired
    private UserService userRepository;
    @ModelAttribute
    private void userDetails(Model model, Principal principal) {
        String name = principal.getName();
        User user = userRepository.findById(name);
        model.addAttribute("user", user);
    }
    @RequestMapping("/dashboard")
    public String indexPage() {
        return "index";
    }
    @RequestMapping("/biodata")
	public String biodataPage() {
		return "pages/biodata";
	}
	@RequestMapping("/pesertaProgram")
	public String pesertaProgramPage() {
		return "pages/pesertaProgram";
	}
	@RequestMapping("/waliSiswa")
	public String waliSiswaPage() {
		return "pages/waliSiswa";
	}
	@RequestMapping("/program-angkatan")
	public String programAngkatanPage() {
		return "pages/program-angkatan";
	}
	@RequestMapping("/program-angkatan-level")
	public String programAngkatanLevelPage() {
		return "pages/program-angkatan-level";
	}
	@RequestMapping("/programPembelajaran")
	public String programPembelajaranPage() {
		return "pages/programPembelajaran";
	}
	@RequestMapping("/jenisNilai")
	public String jenisNilaiPage() {
		return "pages/jenisNilai";
	}
	@RequestMapping("/kelasProgram")
	public String kelasProgramPage() {
		return "pages/kelasProgram";
	}
	@RequestMapping("/kurikulum")
	public String kurikulumPage() {
		return "pages/kurikulum";
	}
	@RequestMapping("/mapel")
	public String mapelPage() {
		return "pages/mapel-new";
	}
	@RequestMapping("/mapelPeserta")
	public String mapelPesertaPage() {
		return "pages/mapelPeserta";
	}
	@RequestMapping("/referensi")
	public String referensiPage() {
		return "pages/referensi";
	}
	@RequestMapping("/silabus")
	public String silabusPage() {
		return "pages/silabus";
	}
}

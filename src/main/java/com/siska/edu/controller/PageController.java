package com.siska.edu.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController {
	@RequestMapping("/")
	public String indexPage() {
		return "index";
	}
	@RequestMapping("/login.html")
	public String loginPage() {
		return "login";
	}

	@RequestMapping("/tables/biodata")
	public String biodataPage(Model m, @AuthenticationPrincipal UserDetails currentUser) {
		String name = currentUser.getUsername();
		m.addAttribute("user", name);
		return "pages/biodata";
	}
	@RequestMapping("/tables/pesertaProgram")
	public String pesertaProgramPage() {
		return "pages/pesertaProgram";
	}
	@RequestMapping("/tables/waliSiswa")
	public String waliSiswaPage() {
		return "pages/waliSiswa";
	}
	@RequestMapping("/tables/programAngkatan")
	public String programAngkatanPage() {
		return "pages/programAngkatan";
	}
	@RequestMapping("/tables/programPembelajaran")
	public String programPembelajaranPage() {
		return "pages/programPembelajaran";
	}
	@RequestMapping("/tables/jenisNilai")
	public String jenisNilaiPage() {
		return "pages/jenisNilai";
	}
	@RequestMapping("/tables/kelasProgram")
	public String kelasProgramPage() {
		return "pages/kelasProgram";
	}
	@RequestMapping("/tables/kurikulum")
	public String kurikulumPage(Model m, @AuthenticationPrincipal UserDetails curentUser) {
		String name = curentUser.getUsername();
		m.addAttribute("user", name);
		return "pages/kurikulum";
	}
	@RequestMapping("/tables/mapel")
	public String mapelPage() {
		return "pages/mapel";
	}
	@RequestMapping("/tables/mapelPeserta")
	public String mapelPesertaPage(Model m, @AuthenticationPrincipal UserDetails currentUser) {
		String name = currentUser.getUsername();
		m.addAttribute("user", name);
		return "pages/mapelPeserta";
	}
	@RequestMapping("/tables/referensi")
	public String referensiPage() {
		return "pages/referensi";
	}
	@RequestMapping("/tables/silabus")
	public String silabusPage() {
		return "pages/silabus";
	}
}

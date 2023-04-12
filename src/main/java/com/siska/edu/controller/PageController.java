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
	public String pesertaProgramPage(Model m, @AuthenticationPrincipal UserDetails currentUser) {
		String name = currentUser.getUsername();
		m.addAttribute("user", name);
		return "pages/pesertaProgram";
	}
	@RequestMapping("/tables/waliSiswa")
	public String waliSiswaPage(Model m, @AuthenticationPrincipal UserDetails currentUser) {
		String name = currentUser.getUsername();
		m.addAttribute("user", name);
		return "pages/waliSiswa";
	}
	@RequestMapping("/tables/program-angkatan")
	public String programAngkatanPage(Model model, @AuthenticationPrincipal UserDetails currentUser) {
		String loggedUser = currentUser.getUsername();
		model.addAttribute("user", loggedUser);
		return "pages/program-angkatan";
	}
	@RequestMapping("/tables/program-angkatan-level")
	public String programAngkatanLevelPage(Model model, @AuthenticationPrincipal UserDetails currentUser) {
		String loggedUser = currentUser.getUsername();
		model.addAttribute("user", loggedUser);
		return "pages/program-angkatan-level";
	}
	@RequestMapping("/tables/programPembelajaran")
	public String programPembelajaranPage(Model m, @AuthenticationPrincipal UserDetails currentUser) {
		String name = currentUser.getUsername();
		m.addAttribute("user", name);
		return "pages/programPembelajaran";
	}
	@RequestMapping("/tables/jenisNilai")
	public String jenisNilaiPage(Model m, @AuthenticationPrincipal UserDetails currentUser) {
		String name = currentUser.getUsername();
		m.addAttribute("user", name);
		return "pages/jenisNilai";
	}
	@RequestMapping("/tables/kelasProgram")
	public String kelasProgramPage(Model m, @AuthenticationPrincipal UserDetails currentUser) {
		String name = currentUser.getUsername();
		m.addAttribute("user", name);
		return "pages/kelasProgram";
	}
	@RequestMapping("/tables/kurikulum")
	public String kurikulumPage(Model m, @AuthenticationPrincipal UserDetails curentUser) {
		String name = curentUser.getUsername();
		m.addAttribute("user", name);
		return "pages/kurikulum";
	}
	@RequestMapping("/tables/mapel")
	public String mapelPage(Model m, @AuthenticationPrincipal UserDetails curentUser) {
		String name = curentUser.getUsername();
		m.addAttribute("user", name);
		return "pages/mapel-new";
	}
	@RequestMapping("/tables/mapelPeserta")
	public String mapelPesertaPage(Model m, @AuthenticationPrincipal UserDetails currentUser) {
		String name = currentUser.getUsername();
		m.addAttribute("user", name);
		return "pages/mapelPeserta";
	}
	@RequestMapping("/tables/referensi")
	public String referensiPage(Model m, @AuthenticationPrincipal UserDetails currentUser) {
		String name = currentUser.getUsername();
		m.addAttribute("user", name);
		return "pages/referensi";
	}
	@RequestMapping("/tables/silabus")
	public String silabusPage(Model m, @AuthenticationPrincipal UserDetails currentUser) {
		String name = currentUser.getUsername();
		m.addAttribute("user", name);
		return "pages/silabus";
	}
}

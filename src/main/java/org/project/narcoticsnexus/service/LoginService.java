package org.project.narcoticsnexus.service;

import lombok.RequiredArgsConstructor;
import org.project.narcoticsnexus.eNum.UserType;
import org.project.narcoticsnexus.entity.Login;
import org.project.narcoticsnexus.repo.LoginRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {
    private final LoginRepository loginRepository;
    private final CustomerService customerService;
    private final VendorService vendorService;
    public void addUser(Login login){
        loginRepository.save(login);
    }
    public Login getLoginInfo(String username){
        return loginRepository.findById(username).orElse(new Login());
    }
    public void deleteUser(String username){
        Login loginInfo = loginRepository.findById(username).orElse(null);
        if(loginInfo!=null){
            if(loginInfo.getUserType() == UserType.CUSTOMER){
                customerService.deleteCustomer(username);
            }
            else if (loginInfo.getUserType() == UserType.VENDOR) {
                vendorService.deleteVendor(username);
            }
        }
    }
    public void updatePassword(Login login){
        loginRepository.save(login);
    }
}

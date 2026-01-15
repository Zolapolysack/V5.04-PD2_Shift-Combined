/**
 * PD2 Multi-Language Translation System
 * Supported Languages: Thai (th), English (en), Burmese (my), Mon (mnw)
 * Generated with Google Translate - Please review accuracy
 */

const translations = {
    th: {
        // Header & Navigation
        'system.title': 'ระบบบันทึกข้อมูลรายงานแผนกผลิต 2',
        'nav.back': 'กลับหน้าหลัก',
        'status.ready': 'สถานะ: พร้อมใช้งาน',
        'shift.a': 'สำหรับ กะ A (08:00-20:00 น.)',
        'shift.b': 'สำหรับ กะ B (20:00-08:00 น.)',
        
        // Language Selector
        'lang.select': 'เลือกภาษา',
        'lang.thai': 'ไทย',
        'lang.english': 'English',
        'lang.burmese': 'မြန်မာ',
        'lang.mon': 'မွန်',
        
        // Data Set Info
        'dataset.count': 'จำนวนชุดข้อมูล',
        'dataset.number': 'ชุดข้อมูลที่',
        
        // Form Sections
        'section.basic': 'ข้อมูลพื้นฐาน',
        'section.meter': 'เลขมิเตอร์ประจำวัน',
        'section.length': 'ความยาวตัดม้วน และ ค่าแรงพนักงาน',
        
        // Form Fields
        'field.date': 'วันที่',
        'field.machine': 'เครื่องทอ NO',
        'field.machine.select': 'เลือกเครื่องทอ',
        'field.machine.custom': 'เครื่องทอ NO (กรอกเอง)',
        'field.machine.placeholder': 'พิมพ์หมายเลขเครื่อง เช่น CL96',
        'field.employee': 'ชื่อพนักงานทอ',
        'field.employee.select': 'เลือกพนักงาน',
        'field.employee.custom': 'ชื่อพนักงานทอ (กรอกเอง)',
        'field.employee.placeholder': 'พิมพ์รหัสหรือชื่อ',
        'field.fabric.size': 'ขนาดหน้าผ้า',
        'field.fabric.custom': 'ขนาดหน้าผ้า (กรอกเอง)',
        'field.fabric.placeholder': 'พิมพ์ขนาดหน้าผ้า',
        'field.meter.start': 'กะ A: เริ่มงาน',
        'field.meter.end': 'กะ A: เลิกงาน',
        'field.meter.start.b': 'กะ B: เริ่มงาน',
        'field.meter.end.b': 'กะ B: เลิกงาน',
        'field.meter.placeholder': 'เช่น 500',
        'field.length': 'ความยาวตัดม้วน (เมตร)',
        'field.length.placeholder': 'เช่น 2500',
        'field.wage': 'ค่าแรงพนักงาน',
        'field.wage.placeholder': 'ค่าแรงพนักงาน',
        
        // Buttons
        'btn.add': 'เพิ่มชุดข้อมูลใหม่',
        'btn.copy': 'คัดลอกโดยเพิ่มชุดข้อมูล',
        'btn.reset': 'รีเซ็ตการบันทึกข้อมูล',
        'btn.export': 'บันทึกเป็นรูปภาพ',
        'btn.save': 'บันทึกข้อมูลทั้งหมด',
        
        // Modals
        'modal.success.title': 'บันทึกข้อมูลสำเร็จ',
        'modal.success.message': 'รายการ ถูกบันทึกเรียบร้อย',
        'modal.loading.title': 'กำลังบันทึกข้อมูล',
        'modal.loading.status': 'กำลังเตรียมข้อมูล...',
        
        // Footer
        'footer.copyright': '© 2026 Production PD2 • แผงควบคุมการผลิตรวม เวอร์ชัน 5.04',
        'footer.support': 'รองรับการใช้งานบนอุปกรณ์พกพา และเบราว์เซอร์หลัก',
        
        // Helper Text
        'helper.select': 'เลือกได้ 2 ทาง: เลือกจากรายการ หรือกรอกเอง'
    },
    
    en: {
        // Header & Navigation
        'system.title': 'Production Unit 2 Data Recording System',
        'nav.back': 'Back to Home',
        'status.ready': 'Status: Ready',
        'shift.a': 'For Shift A (08:00-20:00)',
        'shift.b': 'For Shift B (20:00-08:00)',
        
        // Language Selector
        'lang.select': 'Select Language',
        'lang.thai': 'Thai',
        'lang.english': 'English',
        'lang.burmese': 'Burmese',
        'lang.mon': 'Mon',
        
        // Data Set Info
        'dataset.count': 'Data Sets',
        'dataset.number': 'Data Set',
        
        // Form Sections
        'section.basic': 'Basic Information',
        'section.meter': 'Daily Meter Reading',
        'section.length': 'Roll Length & Wages',
        
        // Form Fields
        'field.date': 'Date',
        'field.machine': 'Loom NO',
        'field.machine.select': 'Select Loom',
        'field.machine.custom': 'Loom NO (Custom)',
        'field.machine.placeholder': 'Enter machine number e.g. CL96',
        'field.employee': 'Weaver Name',
        'field.employee.select': 'Select Employee',
        'field.employee.custom': 'Weaver Name (Custom)',
        'field.employee.placeholder': 'Enter ID or Name',
        'field.fabric.size': 'Fabric Width',
        'field.fabric.custom': 'Fabric Width (Custom)',
        'field.fabric.placeholder': 'Enter fabric width',
        'field.meter.start': 'Shift A: Start',
        'field.meter.end': 'Shift A: End',
        'field.meter.start.b': 'Shift B: Start',
        'field.meter.end.b': 'Shift B: End',
        'field.meter.placeholder': 'e.g. 500',
        'field.length': 'Roll Length (meters)',
        'field.length.placeholder': 'e.g. 2500',
        'field.wage': 'Employee Wage',
        'field.wage.placeholder': 'Employee Wage',
        
        // Buttons
        'btn.add': 'Add New Data Set',
        'btn.copy': 'Copy & Add Data Set',
        'btn.reset': 'Reset Data Entry',
        'btn.export': 'Save as Image',
        'btn.save': 'Save All Data',
        
        // Modals
        'modal.success.title': 'Data Saved Successfully',
        'modal.success.message': 'items saved successfully',
        'modal.loading.title': 'Saving Data',
        'modal.loading.status': 'Preparing data...',
        
        // Footer
        'footer.copyright': '© 2026 Production PD2 • Unified Production Console v5.04',
        'footer.support': 'Supports mobile devices and major browsers',
        
        // Helper Text
        'helper.select': 'Choose either: Select from list or enter manually'
    },
    
    my: {
        // Header & Navigation (Burmese - Myanmar)
        'system.title': 'ထုတ်လုပ်မှုယူနစ် ၂ ဒေတာမှတ်တမ်းစနစ်',
        'nav.back': 'ပင်မစာမျက်နှာသို့',
        'status.ready': 'အခြေအနေ: အသင့်ရှိ',
        'shift.a': 'အပိုင်း A အတွက် (08:00-20:00)',
        'shift.b': 'အပိုင်း B အတွက် (20:00-08:00)',
        
        // Language Selector
        'lang.select': 'ဘာသာစကားရွေးချယ်ရန်',
        'lang.thai': 'ထိုင်း',
        'lang.english': 'အင်္ဂလိပ်',
        'lang.burmese': 'မြန်မာ',
        'lang.mon': 'မွန်',
        
        // Data Set Info
        'dataset.count': 'ဒေတာအစုအရေအတွက်',
        'dataset.number': 'ဒေတာအစု',
        
        // Form Sections
        'section.basic': 'အခြေခံအချက်အလက်',
        'section.meter': 'နေ့စဉ်မီတာဖတ်ခြင်း',
        'section.length': 'လိပ်အရှည်နှင့် လုပ်ခ',
        
        // Form Fields
        'field.date': 'ရက်စွဲ',
        'field.machine': 'ရက်ကန်းစက် NO',
        'field.machine.select': 'စက်ရွေးချယ်ရန်',
        'field.machine.custom': 'ရက်ကန်းစက် NO (ကိုယ်တိုင်ရိုက်)',
        'field.machine.placeholder': 'စက်နံပါတ်ရိုက်ပါ ဥပမာ CL96',
        'field.employee': 'ရက်သမားအမည်',
        'field.employee.select': 'ဝန်ထမ်းရွေးချယ်ရန်',
        'field.employee.custom': 'ရက်သမားအမည် (ကိုယ်တိုင်ရိုက်)',
        'field.employee.placeholder': 'ID သို့မဟုတ် အမည်ရိုက်ပါ',
        'field.fabric.size': 'အထည်အကျယ်',
        'field.fabric.custom': 'အထည်အကျယ် (ကိုယ်တိုင်ရိုက်)',
        'field.fabric.placeholder': 'အထည်အကျယ်ရိုက်ပါ',
        'field.meter.start': 'အပိုင်း A: စတင်',
        'field.meter.end': 'အပိုင်း A: ပြီးဆုံး',
        'field.meter.start.b': 'အပိုင်း B: စတင်',
        'field.meter.end.b': 'အပိုင်း B: ပြီးဆုံး',
        'field.meter.placeholder': 'ဥပမာ 500',
        'field.length': 'လိပ်အရှည် (မီတာ)',
        'field.length.placeholder': 'ဥပမာ 2500',
        'field.wage': 'ဝန်ထမ်းလုပ်ခ',
        'field.wage.placeholder': 'ဝန်ထမ်းလုပ်ခ',
        
        // Buttons
        'btn.add': 'ဒေတာအစုအသစ်ထည့်ရန်',
        'btn.copy': 'ကူးယူ၍ ဒေတာအစုထည့်ရန်',
        'btn.reset': 'ဒေတာထည့်သွင်းမှုပြန်လည်စတင်ရန်',
        'btn.export': 'ပုံအဖြစ်သိမ်းရန်',
        'btn.save': 'ဒေတာအားလုံးသိမ်းရန်',
        
        // Modals
        'modal.success.title': 'ဒေတာသိမ်းဆည်းအောင်မြင်ပါသည်',
        'modal.success.message': 'ပစ္စည်းများ အောင်မြင်စွာသိမ်းဆည်းပြီးပါပြီ',
        'modal.loading.title': 'ဒေတာသိမ်းဆည်းနေသည်',
        'modal.loading.status': 'ဒေတာပြင်ဆင်နေသည်...',
        
        // Footer
        'footer.copyright': '© 2026 Production PD2 • Unified Production Console v5.04',
        'footer.support': 'မိုဘိုင်းစက်ပစ္စည်းများနှင့် အဓိကဘရောက်ဆာများကို ပံ့ပိုးသည်',
        
        // Helper Text
        'helper.select': 'ရွေးချယ်မှု: စာရင်းမှရွေးချယ်ပါ သို့မဟုတ် ကိုယ်တိုင်ရိုက်ထည့်ပါ'
    },
    
    mnw: {
        // Header & Navigation (Mon Language - using Myanmar script)
        'system.title': 'ဂကောံထုတ်လုပ်မှု ၂ စနစ်မှတ်တမ်း',
        'nav.back': 'ကလေၚ်စိုပ်မုက်ဇၞော်',
        'status.ready': 'အခြေအနေ: အသင့်',
        'shift.a': 'ကဏ္ဍ A (08:00-20:00)',
        'shift.b': 'ကဏ္ဍ B (20:00-08:00)',
        
        // Language Selector
        'lang.select': 'ရုဲစှ်ဘာသာ',
        'lang.thai': 'ထဲ',
        'lang.english': 'အၚ်္ဂလိက်',
        'lang.burmese': 'ဗၟာ',
        'lang.mon': 'မန်',
        
        // Data Set Info
        'dataset.count': 'ဂၞန်ဒေတာ',
        'dataset.number': 'ဒေတာကဏ္ဍ',
        
        // Form Sections
        'section.basic': 'အခြေခံသတင်း',
        'section.meter': 'မီတာနေ့',
        'section.length': 'လိပ်နှင့်လုပ်ခ',
        
        // Form Fields
        'field.date': 'နေ့',
        'field.machine': 'စက် NO',
        'field.machine.select': 'ရုဲစှ်စက်',
        'field.machine.custom': 'စက် NO (ရိုက်)',
        'field.machine.placeholder': 'ရိုက်နံပါတ် CL96',
        'field.employee': 'အမည်သမား',
        'field.employee.select': 'ရုဲစှ်သမား',
        'field.employee.custom': 'အမည်သမား (ရိုက်)',
        'field.employee.placeholder': 'ရိုက် ID',
        'field.fabric.size': 'အထည်ဗ္ၚ',
        'field.fabric.custom': 'အထည် (ရိုက်)',
        'field.fabric.placeholder': 'ရိုက်အထည်',
        'field.meter.start': 'A: စတင်',
        'field.meter.end': 'A: ဒှ်ဂှ်',
        'field.meter.start.b': 'B: စတင်',
        'field.meter.end.b': 'B: ဒှ်ဂှ်',
        'field.meter.placeholder': '500',
        'field.length': 'လိပ် (မီတာ)',
        'field.length.placeholder': '2500',
        'field.wage': 'လုပ်ခ',
        'field.wage.placeholder': 'လုပ်ခ',
        
        // Buttons
        'btn.add': 'ထပ်ဒေတာ',
        'btn.copy': 'ကော်ပဳဒေတာ',
        'btn.reset': 'ပြန်စ',
        'btn.export': 'သိမ်းပုံ',
        'btn.save': 'သိမ်းဒေတာ',
        
        // Modals
        'modal.success.title': 'သိမ်းအောင်မြင်',
        'modal.success.message': 'ပစ္စည်းသိမ်းပြီး',
        'modal.loading.title': 'သိမ်းဒေတာ',
        'modal.loading.status': 'ပြင်ဆင်...',
        
        // Footer
        'footer.copyright': '© 2026 Production PD2 • Console v5.04',
        'footer.support': 'ပံ့ပိုးမိုဘိုင်းနှင့်ဘရောက်ဆာ',
        
        // Helper Text
        'helper.select': 'ရုဲစှ်: မှစာရင်း သို့ ရိုက်'
    }
};

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = translations;
}

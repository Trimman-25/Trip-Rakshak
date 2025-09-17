import React from 'react';
import { Phone, Plus, X, Save, Edit3, Trash2 } from 'lucide-react';

const ContactsScreen = ({ 
  currentCityData,
  personalContacts,
  showAddContact,
  setShowAddContact,
  editingContact,
  setEditingContact,
  newContact,
  setNewContact,
  handleAddContact,
  handleEditContact,
  handleUpdateContact,
  handleDeleteContact
}) => (
  <div className="contacts-screen">
    <h2 className="contacts-title">Emergency Contacts</h2>
    <p className="contacts-subtitle">For {currentCityData.name}</p>
    
    {/* Official Emergency Contacts */}
    <div className="contacts-section">
      <h3 className="contacts-section-title">Official Emergency Services</h3>
      <div className="contacts-list">
        {[
          { name: 'Local Police', number: '100', type: 'Police', cssClass: 'contact-type-blue' },
          { name: 'Medical Emergency', number: '108', type: 'Medical', cssClass: 'contact-type-red' },
          { name: 'Fire Department', number: '101', type: 'Fire', cssClass: 'contact-type-orange' },
          { name: 'Tourist Helpline', number: '1363', type: 'Tourism', cssClass: 'contact-type-green' },
          { name: 'Women Helpline', number: '1091', type: 'Safety', cssClass: 'contact-type-purple' },
        ].map((contact, index) => (
          <div key={index} className="contact-card">
            <div className="contact-content">
              <div className="contact-info">
                <h3 className="contact-name">{contact.name}</h3>
                <p className="contact-number">{contact.number}</p>
                <span className={`contact-type ${contact.cssClass}`}>
                  {contact.type}
                </span>
              </div>
              <button className="call-btn">
                <Phone size={18} />
                <span className="call-btn-text">Call</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Personal Emergency Contacts */}
    <div className="contacts-section">
      <div className="contacts-section-header">
        <h3 className="contacts-section-title">Personal Emergency Contacts</h3>
        <button 
          className="add-contact-btn"
          onClick={() => setShowAddContact(true)}
        >
          <Plus size={16} />
          <span>Add Contact</span>
        </button>
      </div>

      {/* Add/Edit Contact Form */}
      {(showAddContact || editingContact) && (
        <div className="contact-form-card">
          <div className="contact-form-header">
            <h4 className="contact-form-title">
              {editingContact ? 'Edit Contact' : 'Add New Contact'}
            </h4>
            <button 
              className="contact-form-close"
              onClick={() => {
                setShowAddContact(false);
                setEditingContact(null);
                setNewContact({ name: '', number: '', relationship: '' });
              }}
            >
              <X size={16} />
            </button>
          </div>
          <div className="contact-form">
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter contact name"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-input"
                placeholder="+91-XXXXXXXXXX"
                value={newContact.number}
                onChange={(e) => setNewContact({ ...newContact, number: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Relationship</label>
              <select
                className="form-select"
                value={newContact.relationship}
                onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
              >
                <option value="">Select relationship</option>
                <option value="Family">Family</option>
                <option value="Friend">Friend</option>
                <option value="Colleague">Colleague</option>
                <option value="Doctor">Doctor</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button 
              className="save-contact-btn"
              onClick={editingContact ? handleUpdateContact : handleAddContact}
            >
              <Save size={16} />
              <span>{editingContact ? 'Update Contact' : 'Save Contact'}</span>
            </button>
          </div>
        </div>
      )}

      <div className="contacts-list">
        {personalContacts.map((contact) => (
          <div key={contact.id} className="contact-card personal-contact-card">
            <div className="contact-content">
              <div className="contact-info">
                <h3 className="contact-name">{contact.name}</h3>
                <p className="contact-number">{contact.number}</p>
                <span className="contact-type contact-type-personal">
                  {contact.relationship}
                </span>
              </div>
              <div className="contact-actions">
                <button className="contact-action-btn" onClick={() => handleEditContact(contact)}>
                  <Edit3 size={16} />
                </button>
                <button className="contact-action-btn contact-delete-btn" onClick={() => handleDeleteContact(contact.id)}>
                  <Trash2 size={16} />
                </button>
                <button className="call-btn">
                  <Phone size={18} />
                  <span className="call-btn-text">Call</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ContactsScreen;